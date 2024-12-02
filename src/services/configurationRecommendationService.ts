// Class for configuration recommendations
class ConfigurationRecommendationService {
    recommendConfiguration(gameTitle: string): object {
        return { resolution: '1920x1080', quality: 'High' };
    }
}