import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { Link } from '@mui/material';
import React from 'react';

const FilePreview = () => {
	const docs = [
		{
			uri: 'https://marinem-storage-prod2.s3.ap-southeast-1.amazonaws.com/marinemdev/vessel-visit/1689165102081_862731339.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231129T022101Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Credential=AKIAXCKWN5SCGQEDP6VI%2F20231129%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=d62567fcef031984f9e0cdf880603857542b570404b629c058ee87ac593dfa57',
		},
		{ uri: 'https://s1.q4cdn.com/806093406/files/doc_downloads/test.pdf' },
		{
			uri: 'https://marinem-storage-prod2.s3.ap-southeast-1.amazonaws.com/marinemdev/vessel-visit/1701228061269_958896104.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231129T033558Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=AKIAXCKWN5SCGQEDP6VI%2F20231129%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=938775837e01681d8c2f15ded2ac2f12c07aa536dbd41c9afe2c998903011240',
		},
	];
	return (
		<>
			<div>FilePreview</div>
			<Link href="https://api.codingbeautydev.com/blog" target="_blank" rel="noreferrer">
				Link
			</Link>
		</>
	);
};

export default FilePreview;
