"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import { useProviders } from "@/utils/hooks/useProviders";
import {
  fallbackIcon,
  useProviderImages,
} from "@/entities/provider-images/model/useProviderImages";

/*
If the icon is not found, it renders a default unknown icon.
*/

export const DynamicImageProviderIcon = (props: any) => {
  const { providerType, src, ...rest } = props;
  const { data: providers } = useProviders();
  const { getImageUrl, blobCache } = useProviderImages();
  const [imageSrc, setImageSrc] = useState<string>(
    blobCache[providerType] || src || fallbackIcon
  );

  useEffect(() => {
    // If src is provided, use it directly
    if (src) {
      setImageSrc(src);
      return;
    }
    
    if (!providerType) {
      setImageSrc(fallbackIcon);
      return;
    }

    const loadImage = async () => {
      // For "sentra" provider, use static icon immediately without waiting for providers data
      if (providerType === "sentra") {
        setImageSrc(`/icons/${providerType}-icon.png`);
        return;
      }

      if (!providers) {
        // While waiting for providers data, try to load the static icon
        setImageSrc(`/icons/${providerType}-icon.png`);
        return;
      }

      const isKnownProvider = providers.providers?.some(
        (provider) => provider.type === providerType
      );

      if (isKnownProvider) {
        setImageSrc(`/icons/${providerType}-icon.png`);
      } else if (providerType.includes("@")) {
        // A hack so we can use the mailgun icon for alerts that comes from email (source is the sender email)
        setImageSrc("/icons/mailgun-icon.png");
      } else {
        try {
          const customImageUrl = await getImageUrl(providerType);
          setImageSrc(customImageUrl || fallbackIcon);
        } catch (error) {
          setImageSrc(fallbackIcon);
        }
      }
    };

    loadImage();
  }, [providers, getImageUrl, providerType, src]);

  return (
    <Image
      {...rest}
      alt={providerType || "No provider icon found"}
      src={imageSrc}
      onError={() => {
        // If we're already showing the fallback icon, don't try to set it again
        if (imageSrc !== fallbackIcon) {
          setImageSrc(fallbackIcon);
        }
      }}
      unoptimized
    />
  );
};
