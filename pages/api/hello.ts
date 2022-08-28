// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { RoomPreferencesSharp } from '@mui/icons-material'
import type { NextApiRequest, NextApiResponse } from 'next'
const baseURL = "https://www.reddit.com/api/v1/authorize?"
const authorizationUrl = baseURL + process.env.CLIENT_ID;
type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}
