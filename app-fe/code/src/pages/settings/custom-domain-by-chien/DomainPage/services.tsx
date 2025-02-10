import { Domain, DomainCreate, DomainsResponse, ErrorResponse } from './type';

const url = import.meta.env.VITE_REACT_APP_BASE_URL as string;

export const getListDomain = async (
  apiKey: string
): Promise<DomainsResponse | ErrorResponse> => {
  if (!apiKey) {
    return { error: 'API Key not found. Please log in again.' };
  }

  try {
    const response = await fetch(`${url}/v1/account/custom-domains`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return { domains: data.domains };
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? err.message
          : 'Failed to fetch domains. Please try again later.',
    };
  }
};
export const getDomainDetails = async (
  apiKey: string,
  id: string
): Promise<Domain | ErrorResponse> => {
  if (!apiKey || !id) {
    return { error: 'API Key not found. Please log in again.' };
  }

  try {
    const response = await fetch(`${url}/v1/account/custom-domains/${id}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return { ...data };
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? err.message
          : 'Failed to fetch domains. Please try again later.',
    };
  }
};
export const RemoveDomain = async (
  apiKey: string,
  id: string
): Promise<{ message: string; statusCode: number } | ErrorResponse> => {
  if (!apiKey || !id) {
    return { error: 'API Key not found. Please log in again.' };
  }

  try {
    const response = await fetch(`${url}/v1/account/custom-domains/${id}`, {
      method: 'DELETE',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    const statusCode = response.status;

    if (!response.ok) {
      throw new Error(`Not found or Wrong Id`);
    }

    return { message: 'Domain removed successfully', statusCode };
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? err.message
          : 'Failed to fetch domains. Please try again later.',
    };
  }
};
export const postCreateDomain = async (
  apiKey: string,
  body: { domain: string; isPublished: boolean; subdomain: string }
): Promise<DomainCreate | ErrorResponse> => {
  if (!apiKey) {
    return { error: 'API Key not found. Please log in again.' };
  }
  try {
    const response = await fetch(`${url}/v1/account/custom-domains`, {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Domain is already exist!');
    }

    const data = await response.json();
    return { ...data };
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? err.message
          : 'Failed to fetch domains. Please try again later.',
    };
  }
};
