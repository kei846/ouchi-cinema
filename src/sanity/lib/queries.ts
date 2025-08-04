import { groq } from 'next-sanity';

export const choicesQuery = groq`
  *[_type == "homepage"][0]{
    choices
  }
`;

export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    systemMessage,
    transitionMessage,
    choiceTitle,
    deepThinkButtonText,
    justWatchButtonText,
    deepThinkContent,
    justWatchContent
  }
`;
