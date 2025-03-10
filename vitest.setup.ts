/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import "@testing-library/jest-dom/vitest";
import { i18n } from '@lingui/core';
import { DEFAULT_LOCALE } from '~/i18n/i18n';
import { server } from '~/global/tests/nodeServer';

expect.extend(matchers)


beforeAll(() => {
    i18n.loadAndActivate({ locale: DEFAULT_LOCALE, messages: {
        "test": "test string"
    } });

    server.listen({
        onUnhandledRequest(request) {
            console.error("Unhandled request::", request.url, request.body);
        }
    })
})

afterEach(() => server.resetHandlers());

afterAll(() => {
    cleanup();
    vi.unstubAllGlobals();
    server.close();
})