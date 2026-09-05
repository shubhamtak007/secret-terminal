const getUiRoute = (pageName: string, properties: { id: string }) => {
    switch (pageName) {
        case 'coinAnalysis': { return `/coin-analysis/${properties.id}` }
        default: return null;
    }
}

export { getUiRoute };