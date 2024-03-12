"use client";

// Function to convert Blob to data URL
export async function blobToDataURL(blobUrl: any) {
  try {
    // Fetch the content of the Blob URL
    const response = await fetch(blobUrl);
    const blob = await response.blob();

    // Convert the Blob to a data URL using FileReader
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error: any) {
    throw new Error(`Error converting Blob URL to data URL: ${error.message}`);
  }
}

export async function convertImagesToDataURLs(imageUrls: string[]) {
  try {
    const dataURLs = await Promise.all(
      imageUrls.map(async (blobUrl) => {
        return await blobToDataURL(blobUrl);
      })
    );
    return dataURLs;
  } catch (error: any) {
    throw new Error(`Error converting images to data URLs: ${error.message}`);
  }
}
