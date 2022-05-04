import type { NextApiRequest, NextApiResponse } from 'next'
const account =  async () => {
    var newGetRequest = await fetch("/.netlify/");
    var newListJson = await newGetRequest.json();
}