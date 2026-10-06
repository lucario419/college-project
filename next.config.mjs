/** @type {import('next').NextConfig} */
const nextConfig = {
	serverExternalPackages: [
		"quickjs-emscripten",
		"quickjs-emscripten-core",
		"@jitl/quickjs-wasmfile-release-sync",
	],
};

export default nextConfig;
