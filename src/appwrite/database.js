import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf";

export class DatabaseService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async ListDocuments({ queries = [Query.equal("status", ["active"])] }) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(`appwrite-list-documents-error: ${error}`);
      return false;
    }
  }

  async createDocument({
    title,
    content,
    slug,
    featuredImage,
    status,
    userId,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.log(`appwrite-create-document-error: ${error}`);
    }
    return null;
  }

  async updateDocument(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.log(`appwrite-update-document-error: ${error}`);
      return false;
    }
  }

  async deleteDocument(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(`appwrite-delete-document-error: ${error}`);
      return false;
    }
  }

  //   upload and delete images

  async getDocument(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(`appwrite-get-document-error: ${error}`);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(`appwrite-upload-image-error: ${error}`);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log(`appwrite-delete-image-error: ${error}`);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log(`appwrite-get-image-preview-error: ${error}`);
      return false;
    }
  }
}

const databaseService = new DatabaseService();

export default databaseService;
