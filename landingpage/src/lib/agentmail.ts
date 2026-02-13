export interface AgentMailPayload {
  to: string;
  subject: string;
  body: string;
}

export interface AgentMailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendEmail(payload: AgentMailPayload): Promise<AgentMailResponse> {
  try {
    const response = await fetch('/api/agentmail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to send email',
      };
    }

    return {
      success: true,
      messageId: data.messageId,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}
