import { createClient } from "pexels";
import appState from "../data/appState";

export default (() => {
  const KEY = process.env.PEXELS;
  const client = createClient(KEY);

  const getData = () => {
     return client.photos.search({ query: 'Night Sky Clouds', per_page: 1 })
  };

  const setData = async () => {
    const dataPayload = await getData().catch(error => console.error(error));
    const { photos } = dataPayload;
    const [ photo ] = photos;
    const { src, avg_color } = photo;

    appState.setBackground(src.original)
    appState.setTheme(avg_color);
  };

  setData();
  return { setData }
})()
