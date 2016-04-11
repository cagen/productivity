function FindProxyForURL(url, host) {
  musicHost = "m*.music.126.net";
  if(shExpMatch(host,musicHost)){return "PROXY localhost:4163"}
  return "DIRECT";
}