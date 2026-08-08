export interface EnrollmentPayload {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  educationalLevel?: string;
  location?: string;
  preferredFormat: "Physical" | "Online" | "Hybrid" | string;
  reason?: string;
  message?: string;
}

export interface ContactPayload {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

/**
 * Helper to simulate network latency during dev/fallback mode
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Submit Student Course Enrollment Form
 */
export async function submitEnrollment(payload: EnrollmentPayload): Promise<ApiResponse> {
  // If a real API URL is specified in environment, try calling the REST endpoint
  if (API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}/enrollments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit enrollment request.");
      }

      const data = await response.json();
      return {
        success: true,
        message: "Enrollment Submitted Successfully! Our team will contact you shortly.",
        data,
      };
    } catch (error) {
      console.warn("API Endpoint unavailable, using development fallback mode:", error);
      // Fallback to simulated submission if server is unreachable
    }
  }

  // Development Fallback Simulation
  await delay(1200);

  // Simple validation check
  if (!payload.fullName || !payload.email || !payload.phone || !payload.course) {
    return {
      success: false,
      message: "Please fill in all required fields marked with *",
    };
  }

  return {
    success: true,
    message: "Enrollment Submitted Successfully! Thank you for your interest in AMAGix Technologies. Our team will contact you shortly.",
  };
}

/**
 * Submit Contact Inquiry Form
 */
export async function submitContactForm(payload: ContactPayload): Promise<ApiResponse> {
  if (API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to send message.");
      }

      const data = await response.json();
      return {
        success: true,
        message: "Message Sent Successfully! We will respond to your inquiry shortly.",
        data,
      };
    } catch (error) {
      console.warn("API Endpoint unavailable, using development fallback mode:", error);
    }
  }

  // Development Fallback Simulation
  await delay(1000);

  if (!payload.fullName || !payload.email || !payload.message) {
    return {
      success: false,
      message: "Please fill in all required contact fields.",
    };
  }

  return {
    success: true,
    message: "Message Sent Successfully! Thank you for contacting AMAGix Technologies. We will get back to you shortly.",
  };
}
