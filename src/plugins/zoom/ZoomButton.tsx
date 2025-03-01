import * as React from "react";

import { createIcon, IconButton, useLightboxProps } from "../../core/index.js";
import { useZoom } from "./ZoomController.js";

const ZoomInIcon = createIcon(
    "ZoomIn",
    <>
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" />
    </>
);

const ZoomOutIcon = createIcon(
    "ZoomOut",
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z" />
);

/** Zoom button props */
export type ZoomButtonProps = {
    zoomIn?: boolean;
    onLoseFocus: () => void;
};

/** Zoom button */
export const ZoomButton = React.forwardRef<HTMLButtonElement, ZoomButtonProps>(function ZoomButton(
    { zoomIn, onLoseFocus },
    ref
) {
    const wasEnabled = React.useRef(false);
    const wasFocused = React.useRef(false);

    const { zoom, maxZoom, zoomIn: zoomInCallback, zoomOut: zoomOutCallback, disabled: zoomDisabled } = useZoom();
    const { render } = useLightboxProps();

    const disabled = zoomDisabled || (zoomIn ? zoom >= maxZoom : zoom <= 1);

    React.useEffect(() => {
        if (disabled && wasEnabled.current && wasFocused.current) {
            onLoseFocus();
        }
        if (!disabled) {
            wasEnabled.current = true;
        }
    }, [disabled, onLoseFocus]);

    return (
        <IconButton
            ref={ref}
            disabled={disabled}
            label={zoomIn ? "Zoom in" : "Zoom out"}
            icon={zoomIn ? ZoomInIcon : ZoomOutIcon}
            renderIcon={zoomIn ? render.iconZoomIn : render.iconZoomOut}
            onClick={zoomIn ? zoomInCallback : zoomOutCallback}
            onFocus={() => {
                wasFocused.current = true;
            }}
            onBlur={() => {
                wasFocused.current = false;
            }}
        />
    );
});
