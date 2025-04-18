import { Prisma } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { ErrorMessage } from 'src/models';
import { PrismaErrorCodeMessage } from 'src/models';

export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': {
        const fields = (error.meta?.target as string[]) || ['unknown'];
        throw new GraphQLError(`Duplicate value for: ${fields.join(', ')}`, {
          extensions: {
            code: PrismaErrorCodeMessage.duplicate_record.code,
            fields,
            status: PrismaErrorCodeMessage.duplicate_record.status,
          },
        });
      }

      case 'P2025':
        throw new GraphQLError('Record not found or already deleted', {
          extensions: {
            code: 'RECORD_NOT_FOUND',
            status: 404,
          },
        });

      case 'P2003':
        throw new GraphQLError('Foreign key constraint failed', {
          extensions: {
            code: 'FOREIGN_KEY_CONSTRAINT',
            status: 400,
          },
        });

      default:
        throw new GraphQLError(`Database error: ${error.message}`, {
          extensions: {
            code: 'PRISMA_ERROR',
            status: 500,
          },
        });
    }
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    throw new GraphQLError(`Unknown Prisma error: ${error.message}`, {
      extensions: {
        code: 'UNKNOWN_PRISMA_ERROR',
        status: 500,
      },
    });
  }

  throw new GraphQLError(ErrorMessage.internal_server_error.message_to_client, {
    extensions: {
      code: ErrorMessage.internal_server_error.code,
      status: ErrorMessage.internal_server_error.status,
    },
  });
}
