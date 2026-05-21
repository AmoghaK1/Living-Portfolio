import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import ChatBox from "./components/ChatBox";
import AnimatedBackground from "./components/AnimatedBackground";
import ModeToggle from "./components/ModeToggle";
import Backyard from "./pages/Backyard";
import { setThemeColors } from "@/lib/colors";
export default function App() {
    const [mode, setMode] = useState("chat");
    const [contentVisible, setContentVisible] = useState(true);
    const [themeId, setThemeId] = useState("sunlit-red");
    const [settingsOpen, setSettingsOpen] = useState(false);
    const isDarkTheme = ["midnight-plum", "neon-forest", "cobalt-ink", "ember-night"].includes(themeId);
    const transitioning = useRef(false);
    const handleThemeChange = (nextTheme) => {
        setThemeId(nextTheme);
        setThemeColors(nextTheme);
    };
    const switchTo = (target) => {
        if (transitioning.current)
            return;
        transitioning.current = true;
        // Step 1: fade out content only (250ms)
        setContentVisible(false);
        setTimeout(() => {
            // Step 2: swap page while invisible
            setMode(target);
            // Step 3: fade content back in (250ms)
            setTimeout(() => {
                setContentVisible(true);
                setTimeout(() => { transitioning.current = false; }, 250);
            }, 50);
        }, 250);
    };
    return (_jsxs(_Fragment, { children: [_jsx(AnimatedBackground, {}), _jsx("div", { className: "relative z-10", style: {
                    opacity: contentVisible ? 1 : 0,
                    transition: "opacity 250ms ease-in-out",
                }, children: mode === "portfolio" ? (_jsx(Backyard, { onBack: () => switchTo("chat"), isDarkTheme: isDarkTheme })) : (_jsxs(_Fragment, { children: [_jsx(ModeToggle, { onSwitch: () => switchTo("portfolio"), onOpenSettings: () => setSettingsOpen(true), isDarkTheme: isDarkTheme }), _jsx(ChatBox, { themeId: themeId, onThemeChange: handleThemeChange, settingsOpen: settingsOpen, onSettingsChange: setSettingsOpen })] })) })] }));
}
