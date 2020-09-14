//
//  UserInfo.swift
//  Pokedex
//
//  Created by Sean McGovern on 9/12/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import CoreData

@available(iOS 10.0, *) // required for CoreDataManager
@objc(UserInfo)
// class inherits from NSObject in order to be exposed to obj-c
class UserInfo: NSObject {
  
  // Persisting user data with User Defaults
  let defaults = UserDefaults.standard
  
  struct Keys {
    static let username = "username"
    static let userId = "userId"
    static let savedKanto = "savedKanto"
    static let savedJohto = "savedJohto"
    static let savedHoenn = "savedHoenn"
    static let savedSinnoh = "savedSinnoh"
    static let savedUnova = "savedUnova"
    static let savedKalos = "savedKalos"
    static let savedAlola = "savedAlola"
  }
  
  // annotation used to export method in react-native
  @objc
  func getCredentials(_ callback: RCTResponseSenderBlock) {
    print("Sending the user credentials")
    // let mainContext = CoreDataManager.shared.mainContext
    // print("url: \(String(describing: mainContext.persistentStoreCoordinator?.persistentStores.first?.url))")
    let curName = defaults.value(forKey: Keys.username)
    let curId = defaults.value(forKey: Keys.userId)
    let username: String
    let userId: String
    if (curName != nil) {
      username = curName as! String
      userId = curId as! String
    } else {
      username = ""
      userId = ""
    }
    callback([username, userId])
  }
  
  @objc
  func saveCredentials(_ username: NSString, withId userId: NSString) {
    print("Passed username: \(username)")
    print("Passed id:  \(userId)")
    defaults.set(username, forKey: Keys.username)
    defaults.set(userId, forKey: Keys.userId)
  }
  
  @objc
  func isKantoSaved(_ callback: RCTResponseSenderBlock) {
    let curValue = defaults.bool(forKey: Keys.savedKanto)
    callback([curValue])
  }
  @objc
  func isJohtoSaved(_ callback: RCTResponseSenderBlock) {
    let curValue = defaults.bool(forKey: Keys.savedJohto)
    callback([curValue])
  }
  @objc
  func isHoennSaved(_ callback: RCTResponseSenderBlock) {
    let curValue = defaults.bool(forKey: Keys.savedHoenn)
    callback([curValue])
  }
  @objc
  func isSinnohSaved(_ callback: RCTResponseSenderBlock) {
    let curValue = defaults.bool(forKey: Keys.savedSinnoh)
    callback([curValue])
  }
  @objc
  func isUnovaSaved(_ callback: RCTResponseSenderBlock) {
    let curValue = defaults.bool(forKey: Keys.savedUnova)
    callback([curValue])
  }
  @objc
  func isKalosSaved(_ callback: RCTResponseSenderBlock) {
    let curValue = defaults.bool(forKey: Keys.savedKalos)
    callback([curValue])
  }
  @objc
  func isAlolaSaved(_ callback: RCTResponseSenderBlock) {
    let curValue = defaults.bool(forKey: Keys.savedAlola)
    callback([curValue])
  }
  
  @objc
  func savePokeCard(_ id: NSNumber, generation: NSNumber, name: NSString, height: NSNumber, weight: NSNumber, catchRate: NSNumber, friendship: NSNumber, flavor: NSString) {
      print("id: \(id)")
      let mainContext = CoreDataManager.shared.mainContext
      let newCard = PokeCard(context: mainContext)
      newCard.id = id as! Int64
      newCard.generation = generation as! Int64
      newCard.name = name as String
      newCard.height = height as! Int64
      newCard.weight = weight as! Int64
      newCard.catchRate = catchRate as! Int64
      newCard.friendship = friendship as! Int64
      newCard.flavor = flavor as String
      // newCard.stats = stats as? [Int]
      // newCard.types = types as [String]
      CoreDataManager.shared.saveChanges()
    switch generation {
      case 1:
        defaults.set(true, forKey: Keys.savedKanto)
      case 2:
        defaults.set(true, forKey: Keys.savedJohto)
      case 3:
        defaults.set(true, forKey: Keys.savedHoenn)
      case 4:
        defaults.set(true, forKey: Keys.savedSinnoh)
      case 5:
        defaults.set(true, forKey: Keys.savedUnova)
      case 6:
        defaults.set(true, forKey: Keys.savedKalos)
      case 7:
        defaults.set(true, forKey: Keys.savedAlola)
      default:
        print("Not a valid generation")
    }
    }
  
  @objc
  func getPokeCards() -> [PokeCard]? { // _ gen: NSNumber
    let mainContext = CoreDataManager.shared.mainContext
    let fetchRequest: NSFetchRequest<PokeCard> = PokeCard.fetchRequest()
    do {
        let results = try mainContext.fetch(fetchRequest)
        // print("results: \(results)")
        return results
    }
    catch {
        debugPrint(error)
    }
    return nil
  }
  
//  @objc
//  func savePokeCards(_ cards: [NSDictionary]) {
//    guard let cardsDictionary = cards as? [[String: Any]] else {
//        return
//    }
//    print("Play test", cardsDictionary)
//    print("input cards: \(cards)")
//    // print("We will save the cards in this function")
//    let mainContext = CoreDataManager.shared.mainContext
//    for card in cards {
//      let newCard = PokeCard(context: mainContext)
//      newCard.id = card.value(forKey: "id") as! Int64
//      newCard.generation = card.value(forKey: "generation") as! Int64
//      newCard.name = card.value(forKey: "name") as? String
//      newCard.types = card.object(forKey: "types") as? [String]
//      newCard.height = card.value(forKey: "height") as! Int64
//      newCard.weight = card.value(forKey: "weight") as! Int64
//      newCard.catchRate = card.value(forKey: "catchRate") as! Int64
//      newCard.friendship = card.value(forKey: "friendship") as! Int64
//      newCard.stats = card.object(forKey: "stats") as? [Int]
//      newCard.flavor = card.value(forKey: "flavor") as? String
////      let context = CoreDataManager.shared.backgroundContext()
////      context.perform {
////          let entity = PokeCard.entity()
////          let newCard = PokeCard(entity: entity, insertInto: context)
////          newCard.id = card.value(forKey: "id") as! Int64
////          newCard.generation = card.value(forKey: "generation") as! Int64
////          newCard.name = card.value(forKey: "name") as? String
////          newCard.types = card.object(forKey: "types") as? [String]
////          newCard.height = card.value(forKey: "height") as! Int64
////          newCard.weight = card.value(forKey: "weight") as! Int64
////          newCard.catchRate = card.value(forKey: "catchRate") as! Int64
////          newCard.friendship = card.value(forKey: "friendship") as! Int64
////          newCard.stats = card.object(forKey: "stats") as? [Int]
////          newCard.flavor = card.value(forKey: "flavor") as? String
////          do {
////            try context.save()
////          } catch {
////            let nserror = error as NSError
////            fatalError("Unresolved error \(nserror), \(nserror.userInfo)")
////          }
////      }
//
////      if (mainContext.hasChanges) {
////        do{
////          try mainContext.save()
////        } catch {
////          let nserror = error as NSError
////          fatalError("Unresolved error \(nserror), \(nserror.userInfo)")
////        }
////      }
//       CoreDataManager.shared.saveChanges()
//    }
//  }
  
//  @objc
//  func constantsToExport() -> [AnyHashable : Any]! {
//    return ["initialCount": 0]
//  }
  
}
