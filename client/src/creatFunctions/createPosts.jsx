import {
  filterByConditions,
  filterByCondition,
} from "./filterFunctions/filterFunctions";
import { UndeclaretedPostBlock } from "../routers/UndeclaretedList/blocks/UndeclaretedPostBlock";
import { staticApi } from "../static/static";
import { _postBlock } from "../auxСomponents/_postBlock";

// const postsFilter = (posts, filter) => {
//   console.log(posts);
//   switch (filter.filterMetod) {
//     case "find":
//       break;
//     case "choose":
//       posts.filter((post) => filterByConditions(post, filter.filterAim));
//     case "sort":
//       filter.filterAim
//         ? (posts = filterByCondition(posts, Object.keys(filter.filterAim)))
//         : null;
//     default:
//       filter.reverse ? (posts = [...posts].reverse()) : posts;
//       return posts;
//   }
// };

// var fillter = (object, fillter) => {
//   fillter.filterAim
//     ? (object = filterByCondition(object, Object.keys(fillter.filterAim)))
//     : null;
//   fillter.reverse ? (object = [...object].reverse()) : object;
//   return object;
// };

export const createObjects = (objects, Component, additionalProps = {}) =>
  objects.map((ob) => {
    ob = { ...ob, ...additionalProps };
    return <Component data={ob} key={ob.id} />;
  });

// export var createUndeclaretedPosts = (posts, fillter) => {
//   return posts.map((post) => (
//     <UndeclaretedPostBlock data={post} key={post.id} />
//   ));
// };
