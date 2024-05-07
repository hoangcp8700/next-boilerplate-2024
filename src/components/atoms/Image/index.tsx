'use client';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

import { imageLoader, shimmer, toBase64 } from './utils';

export interface ImageProps extends NextImageProps {
  children?: React.ReactNode;
}

const Image = ({ src, width, height, ...props }: ImageProps) => (
  <NextImage
    placeholder="blur"
    width={width}
    height={height}
    blurDataURL={`data:image/svg+xml;base64,${toBase64(
      shimmer(width as number, height as number),
    )}`}
    src={src}
    loader={imageLoader}
    {...props}
  />
);

export default Image;
