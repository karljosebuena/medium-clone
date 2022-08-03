// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import sanityClient from '@sanity/client';

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  usdCdn: process.env.NODE_ENV == "production",
  token: process.env.SANITY_API_TOKEN
};

const client = sanityClient(config);

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    const {
      _id,
      name,
      email,
      comment
    } = JSON.parse(req.body);

    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id
      },
      name,
      email,
      comment
    })
  } catch (error) {
    res.status(500).json({ message: 'Couldn\'t submit comment', error })
  }
  console.log('Comment submitted');
  res.status(200).json({ message: 'Comment submitted' })
}
