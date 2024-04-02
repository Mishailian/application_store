import { TagBlock } from "../routers/Tags/TagBlock";

export const createTags = (tags) => {
  return tags.map((tag) => <TagBlock key={tag.id} tag={tag} />);
};
