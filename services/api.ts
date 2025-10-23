
// This is a mock API service to simulate backend interactions.
// In a real application, these functions would make HTTP requests to a Node.js/Express server.

interface FormDataPayload {
  [key: string]: any;
  latitude: number | null;
  longitude: number | null;
  photos: string[]; // In a real scenario, this might be URLs after upload
}

export const submitVisitForm = async (formData: FormDataPayload): Promise<{ success: boolean; message: string }> => {
  console.log("Submitting form data to backend:", formData);

  // 1. Simulate saving data to the database
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("Data saved to database successfully.");

  // 2. Simulate file uploads to Google Drive (here we just log the filenames)
  if (formData.photos && formData.photos.length > 0) {
    console.log(`Simulating upload of ${formData.photos.length} photos to Google Drive.`);
    // In a real backend, you would get URLs back from the upload service.
  }

  // 3. Simulate triggering a webhook to WAHA (WhatsApp HTTP API)
  const webhookUrl = 'https://waha.abkciraya.cloud/sentText'; // Example URL
  const webhookPayload = {
    formType: 'Salesforce Visit',
    submittedBy: 'User Name', // This would come from the logged-in user
    ...formData
  };

  console.log(`Triggering webhook to: ${webhookUrl}`);
  console.log("Webhook payload:", JSON.stringify(webhookPayload, null, 2));

  // In a real backend, you'd use a library like 'axios' or 'node-fetch'
  // try {
  //   const response = await axios.post(webhookUrl, webhookPayload);
  //   console.log('Webhook sent successfully, response:', response.data);
  // } catch (error) {
  //   console.error('Failed to send webhook:', error);
  // }
  
  await new Promise(resolve => setTimeout(resolve, 500));

  return { success: true, message: "Form submitted and webhook triggered successfully!" };
};
