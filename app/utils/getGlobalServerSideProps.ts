import type { GetServerSideProps } from 'blitz'

export const getGlobalServerSideProps = <Props>(
  callback: GetServerSideProps<Props>,
): GetServerSideProps => {
  return async (context) => {
    return await callback(context)
  }
}
