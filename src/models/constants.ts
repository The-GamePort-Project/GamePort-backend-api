export enum AuthAndSecurity {
  'SALT_ROUNDS' = 10,
}

export const ErrorMessage: Record<
  string,
  {
    code: string;
    status: number;
    message_to_client: string;
  }
> = {
  internal_server_error: {
    code: 'INTERNAL_SERVER_ERROR',
    status: 500,
    message_to_client: `Something went wrong. Please try again after a little while.`,
  },
};
