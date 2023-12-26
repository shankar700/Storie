import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import databaseService from "../../appwrite/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post = {} }) {
    console.log("post => ",post);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        Title: post.Title ? post.Title : "",
        slug: post.$id ? post.$id : "",
        content: post.content ? post.content : "",
        status: post.status ? post.status : "active",
      },
    });
  const {userData} = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post.Title) {
      const file = data.image[0]
        ? await databaseService.uploadFile(data.image[0])
        : null;

      if (file) {
        databaseService.deleteFile(post.featuredImage);
      }

      const dbPost = await databaseService.updateDocument(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await databaseService.uploadFile(data.image[0])
        : null;
      if (file) {
        data.featuredImage = file.$id;
        const dbPost = await databaseService.createDocument({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .replace(/[^\w\s]/gi, "")
        .trim()
        .replace(/\s/g, "-")
        .toLowerCase();
    } else {
      return "";
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, name) => {
      if (name.name === "Title") {
        setValue("slug", slugTransform(value.Title), {
          shouldValidate: true,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [slugTransform, watch, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("Title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={databaseService.getFilePreview(post.featuredImage)}
              alt={post.Title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post.Title ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post.Title ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
