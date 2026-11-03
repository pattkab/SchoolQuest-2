import UIKit
import Capacitor

#if DEBUG
private let schoolQuestServer = "http://127.0.0.1:3000"
#else
private let schoolQuestServer = "https://schoolquest.cc"
#endif

class SchoolQuestViewController: CAPBridgeViewController {
    override func instanceDescriptor() -> InstanceDescriptor {
        let descriptor = super.instanceDescriptor()
        guard let url = URL(string: schoolQuestServer), let scheme = url.scheme?.lowercased() else { return descriptor }
        let host = url.host ?? ""
        let loopback = host == "127.0.0.1" || host == "localhost"
        if scheme == "https" && !loopback {
            descriptor.serverURL = schoolQuestServer
        } else if scheme == "http" && loopback {
            descriptor.serverURL = schoolQuestServer
        }
        return descriptor
    }
}

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        window = UIWindow(windowScene: windowScene)
        window?.rootViewController = SchoolQuestViewController()
        window?.makeKeyAndVisible()

        SceneDelegateProxy.shared.scene(scene, willConnectTo: session, options: connectionOptions)
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        SceneDelegateProxy.shared.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        SceneDelegateProxy.shared.scene(scene, continue: userActivity)
    }
}
