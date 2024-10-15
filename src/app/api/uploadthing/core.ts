import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {

  
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } }, {awaitServerData: true})
    // Remove middleware as this is public and doesn't require authentication
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // If you need to return any metadata, you can handle it here
      return { uploadedBy: "public_user" }; // No user session, so assign a public identifier
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
