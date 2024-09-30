import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import 'whatwg-fetch'
import { cleanup } from '@testing-library/react';

afterEach(() => {
    cleanup();
});