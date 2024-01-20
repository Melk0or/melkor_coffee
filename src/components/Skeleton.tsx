import React, { FC } from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton: FC = () => (
    <ContentLoader
        speed={2}
        width={300}
        height={400}
        viewBox="0 0 300 400"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="1" y="290" rx="20" ry="20" width="299" height="48" />
        <rect x="1" y="19" rx="52" ry="52" width="299" height="249" />
        <rect x="108" y="351" rx="23" ry="23" width="191" height="44" />
        <rect x="1" y="351" rx="24" ry="24" width="75" height="44" />
    </ContentLoader>
)

export default Skeleton
