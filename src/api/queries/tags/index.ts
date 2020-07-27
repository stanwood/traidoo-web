import axios from "../../../core/axios";

export interface Tag {
  id: number;
  slug: number;
  name: string;
}

export const getTagsRequest = async (key: string): Promise<Tag[]> => {
  const response = await axios.get("tags");
  const tags: Tag[] = response.data;

  return tags.sort((a: Tag, b: Tag) => (a.name > b.name ? 1 : -1));
};
