interface NvidiaProxyRequest {
    apiKey: string;
    payload: Record<string, unknown>;
}

interface NvidiaProxyResponse {
    [key: string]: unknown;
}

export async function POST(request: Request): Promise<Response> {
    try {
        const { apiKey, payload }: NvidiaProxyRequest = await request.json();
        
        const response = await fetch('https://health.api.nvidia.com/v1/biology/nvidia/molmim/generate', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`NVIDIA API responded with status: ${response.status}`);
        }
        
        const data: NvidiaProxyResponse = await response.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error: unknown) {
        console.error('Error in NVIDIA proxy:', error);
        return new Response(JSON.stringify({ error: (error as Error).message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}