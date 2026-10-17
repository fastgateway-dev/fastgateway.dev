import React, {type ReactNode} from 'react';
import Metadata from '@theme-original/BlogPostPage/Metadata';
import type MetadataType from '@theme/BlogPostPage/Metadata';
import type {WrapperProps} from '@docusaurus/types';
import Head from '@docusaurus/Head';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

type Props = WrapperProps<typeof MetadataType>;

// Points agents at the raw-markdown twin that docusaurus-plugin-llms writes
// for every blog post at <permalink without trailing slash>.md.
export default function MetadataWrapper(props: Props): ReactNode {
  const {metadata} = useBlogPost();
  const markdownHref = `${metadata.permalink.replace(/\/$/, '')}.md`;
  return (
    <>
      <Metadata {...props} />
      <Head>
        <link rel="alternate" type="text/markdown" href={markdownHref} />
      </Head>
    </>
  );
}
