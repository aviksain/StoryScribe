const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteTinyApiKey: String(import.meta.env.VITE_APPWRITE_TINY_API_KEY),
    demoLoginEmail: String(import.meta.env.VITE_DEMO_LOGIN_EMAIL),
    demoLoginPassword: String(import.meta.env.VITE_DEMO_LOGIN_PASSWORD)
}

export default conf