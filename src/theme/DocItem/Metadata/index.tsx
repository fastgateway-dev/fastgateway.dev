import React, {type ReactNode} from 'react';
import Metadata from '@theme-original/DocItem/Metadata';
import type MetadataType from '@theme/DocItem/Metadata';
import type {WrapperProps} from '@docusaurus/types';
import Head from '@docusaurus/Head';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

type Props = WrapperProps<typeof MetadataType>;

// Points agents at the raw-markdown twin that docusaurus-plugin-llms writes
// for every doc at <permalink without trailing slash>.md. The docs landing
// page has no twin (it is a React component); its markdown equivalent is the
// docs index, /llms.md.
export default function MetadataWrapper(props: Props): ReactNode {
  const {metadata} = useDoc();
  const markdownHref =
    metadata.permalink === '/docs/'
      ? '/llms.md'
      : `${metadata.permalink.replace(/\/$/, '')}.md`;
  return (
    <>
      <Metadata {...props} />
      <Head>
        <link rel="alternate" type="text/markdown" href={markdownHref} />
      </Head>
    </>
  );
}
