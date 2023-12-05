'use client'

import VPlayer from "vnetwork-player"
import Hls from 'hls.js'

interface PlayerProps {
  src: string
}

const Player: React.FC<PlayerProps> = ({ src }) => {
  return <VPlayer Hls={Hls} className="w-full h-full" source={src} color="#ff0000" autoPlay />
}

export default Player