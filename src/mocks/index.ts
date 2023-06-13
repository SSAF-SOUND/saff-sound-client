export async function initBrowserMocks() {
  if (typeof window !== 'undefined') {
    const { worker } = await import('./browser');
    worker.start();
  }
}

export async function initServerMocks() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    server.listen({
      onUnhandledRequest: 'bypass',
    });
  }
}
