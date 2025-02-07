const url = import.meta.env.VITE_REACT_APP_BASE_URL as string;

export const getDashboardInfoAPI = async (apiKey: string) => {
  if (!apiKey) {
    return { error: 'API Key not found. Please log in again.' };
  }

  try {
    const response = await fetch(`${url}/v1/account/dashboard`, {
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
    const {
      publicKey = 'Unavailable',
      totalLinks = 0,
      subscription: subscriptionPlan = 'Free account',
      name = 'Roo.bz User',
      supportEmail,
    } = data;

    return {
      publicKey,
      totalLinks,
      subscription: subscriptionPlan,
      name,
      supportEmail,
    };
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? err.message
          : 'Failed to fetch dashboard information. Please try again later.',
    };
  }
};
