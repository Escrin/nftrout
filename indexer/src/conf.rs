use std::time::Duration;

use serde::{
    de::{self, Deserializer},
    Deserialize,
};

#[derive(Clone, Debug, Deserialize)]
pub struct Config {
    #[serde(
        deserialize_with = "deserialize_url",
        default = "default_ipfs_endpoint"
    )]
    pub ipfs_endpoint: url::Url,

    #[serde(default = "default_db_path")]
    pub db_path: String,

    #[serde(
        deserialize_with = "deserialize_seconds",
        default = "default_reindex_interval"
    )]
    pub reindex_interval: Duration,

    #[serde(default = "default_chain")]
    pub chain: Chain,
}

#[derive(Clone, Debug, PartialEq, Eq, Hash, Deserialize)]
#[serde(rename = "kebab-case")]
pub enum Chain {
    SapphireMainnet,
    SapphireTestnet,
    Local,
}

fn deserialize_url<'de, D: Deserializer<'de>>(d: D) -> Result<url::Url, D::Error> {
    let url_str = String::deserialize(d)?;
    let url_str = if url_str.ends_with('/') {
        format!("{url_str}/")
    } else {
        url_str
    };
    url_str.parse().map_err(de::Error::custom)
}

fn deserialize_seconds<'de, D: Deserializer<'de>>(d: D) -> Result<Duration, D::Error> {
    Ok(Duration::from_secs(<u64>::deserialize(d)?))
}

fn default_chain() -> Chain {
    Chain::SapphireMainnet
}

fn default_ipfs_endpoint() -> url::Url {
    "http://localhost:5001/api/v0/".parse().unwrap()
}

fn default_reindex_interval() -> Duration {
    Duration::from_secs(1 * 60)
}

fn default_db_path() -> String {
    "nftrout.sqlite".into()
}