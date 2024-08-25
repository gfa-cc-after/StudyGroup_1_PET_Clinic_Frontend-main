import '@testing-library/jest-dom/vitest'
import { beforeAll, afterEach, afterAll } from 'vitest'
import 'whatwg-fetch'
import { cleanup } from '@testing-library/react';

afterEach(() => {
    cleanup();
});