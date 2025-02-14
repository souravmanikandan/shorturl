import { nanoid } from 'nanoid';
import Url from '../models/url.model.js'
import { validateUrl } from '../utils/utils.js';

export const urlController = async (req, res) => {
    const { origUrl } = req.body;
    console.log(origUrl);
    const base = process.env.BASE;
  
    const urlId = nanoid(8);
    if (validateUrl(origUrl)) {
      try {
        let url = await Url.findOne({ origUrl });
        if (url) {
          res.json(url);
        } else {
          const shortUrl = `${base}/${urlId}`;
  
          url = new Url({
            origUrl,
            shortUrl,
            urlId,
            date: new Date(),
          });
  
          await url.save();
          res.json(url);
        }
      } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
      }
    } else {
      res.status(400).json('Invalid Original Url');
    }
  }