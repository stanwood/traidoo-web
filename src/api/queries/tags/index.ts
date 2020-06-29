import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export interface Tag {
  id: number;
  slug: number;
  name: string;
}

export const getTagsRequest = async (key: string): Promise<Tag[]> => {
  const tags: Tag[] = await api
    .get("tags", {
      headers: generateHeaders(true),
    })
    .json();

  return tags.sort((a: Tag, b: Tag) => (a.name > b.name ? 1 : -1));
};
