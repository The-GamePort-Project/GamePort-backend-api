export const PrismaErrorCodeMessage: Record<
  string,
  {
    status: number;
    message?: string;
    code: string;
  }
> = {
  database_error: {
    code: 'PRISMA_ERROR',
    status: 500,
  },
  duplicate_record: {
    code: 'DUPLICATE_RECORD',
    status: 404,
  },
  foreign_key_failed: {
    code: 'FOREIGN_KEY_CONSTRAINT',
    status: 400,
  },
  unknown_error: {
    code: 'UNKNOWN_PRISMA_ERROR',
    status: 500,
  },
};
