import * as React from "react";

import { makeUseContext, useEvents, YARL_EVENT_TOOLBAR_WIDTH } from "../../core/index.js";

type CaptionsContextType = {
    toolbarWidth?: number;
};

const CaptionsContext = React.createContext<CaptionsContextType | null>(null);

export const useCaptions = makeUseContext("useCaptions", "CaptionsContext", CaptionsContext);

/** Captions plugin context holder */
export const CaptionsContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { subscribe } = useEvents();

    const [toolbarWidth, setToolbarWidth] = React.useState<number>();

    React.useEffect(() => subscribe(YARL_EVENT_TOOLBAR_WIDTH, (event) => setToolbarWidth(event)), [subscribe]);

    const context = React.useMemo(() => ({ toolbarWidth }), [toolbarWidth]);

    return <CaptionsContext.Provider value={context}>{children}</CaptionsContext.Provider>;
};
