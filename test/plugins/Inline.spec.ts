import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { lightbox, withFakeTimers } from "../utils.js";
import { Inline } from "../../src/plugins/index.js";

describe("Inline", () => {
    const testMainScenario = () => {
        expect(screen.queryByRole("presentation")).toBeInTheDocument();
        expect(screen.queryByLabelText("Close")).not.toBeInTheDocument();
        expect(screen.queryByLabelText("Previous")).toBeInTheDocument();
        expect(screen.queryByLabelText("Next")).toBeInTheDocument();
    };

    it("renders inline lightbox", () => {
        render(lightbox({ plugins: [Inline] }));

        testMainScenario();
    });

    it("ignores open prop", () => {
        render(
            lightbox({
                open: false,
                plugins: [Inline],
            })
        );

        testMainScenario();
    });

    it("doesn't close", () =>
        withFakeTimers(async ({ runAllTimers }) => {
            const user = userEvent.setup({ delay: null });

            render(lightbox({ plugins: [Inline] }));

            await user.keyboard("[Escape]");

            runAllTimers();

            testMainScenario();
        }));
});
