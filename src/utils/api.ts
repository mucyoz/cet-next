// API utility functions for handling requests
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export class ApiError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("API request failed:", error);

    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

// Simulated API functions for demo purposes
export const applicationApi = {
  async submitApplication(data: any): Promise<ApiResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("the data", data);
    // Simulate random success/failure for demo
    if (Math.random() > 0.1) {
      // 90% success rate
      return {
        success: true,
        data: {
          applicationId: `APP-${Date.now()}`,
          status: "submitted",
          estimatedProcessingTime: "5 business days",
        },
        message: "Application submitted successfully",
      };
    } else {
      return {
        success: false,
        error: "Failed to submit application. Please try again.",
      };
    }
  },

  async validateEmail(
    email: string
  ): Promise<ApiResponse<{ isValid: boolean }>> {
    // Simulate email validation
    await new Promise((resolve) => setTimeout(resolve, 500));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    return {
      success: true,
      data: { isValid },
    };
  },

  async uploadDocument(
    file: File
  ): Promise<ApiResponse<{ fileId: string; url: string }>> {
    // Simulate file upload
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      data: {
        fileId: `FILE-${Date.now()}`,
        url: `https://example.com/uploads/${file.name}`,
      },
    };
  },
};
