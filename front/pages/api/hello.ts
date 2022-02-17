import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: "ok"
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET")
    res.status(200).json({ status: "ok" })
  else res.status(405).end()
}
