//
//  PokeCardBridge.swift
//  Pokedex
//
//  Created by Sean McGovern on 9/16/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import CoreData

@available(iOS 10.0, *) // required for CoreDataManager
@objc(PokeCardBridge)
class PokeCardBridge:NSObject {
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
  
  struct Card {
    static let id = "id"
    static let generation = "generation"
    static let name = "name"
    static let height = "height"
    static let weight = "weight"
    static let catchRate = "catchRate"
    static let flavor = "flavor"
    static let friendship = "friendship"
    static let image = "image"
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
      // let imageData = NSData(contentsOf: imageUrl as URL)
      // print("image: \(imageData)")
      // newCard.image = NSData(contentsOf: imageUrl as URL)
      // newCard.sprite = NSData(contentsOf: imageUrl as URL) as Data?
      // newCard.stats = stats as? [Int]
      // newCard.types = types as [String]
      CoreDataManager.shared.saveChanges()
    switch generation {
      case 2:
        defaults.set(true, forKey: Keys.savedKanto)
        break
      case 3:
        defaults.set(true, forKey: Keys.savedJohto)
        break
      case 4:
        defaults.set(true, forKey: Keys.savedHoenn)
        break
      case 5:
        defaults.set(true, forKey: Keys.savedSinnoh)
        break
      case 8:
        defaults.set(true, forKey: Keys.savedUnova)
        break
      case 12:
        defaults.set(true, forKey: Keys.savedKalos)
        break
      case 16:
        defaults.set(true, forKey: Keys.savedAlola)
        break
      default:
        print("Not a valid generation")
    }
    }

  @objc
  func getGeneration(_ gen: NSNumber, callback: RCTResponseSenderBlock) {
    let mainContext = CoreDataManager.shared.mainContext
    let fetchRequest: NSFetchRequest<PokeCard> = PokeCard.fetchRequest()
    let filter = NSPredicate(format: "generation == %@", gen)
    fetchRequest.predicate = filter
    let sort = NSSortDescriptor(key: "id", ascending: true)
    fetchRequest.sortDescriptors = [sort]
    do {
      let results = try mainContext.fetch(fetchRequest)
      var pokeCards = Array<NSMutableDictionary>()
      for entry in results {
        let nextCard = NSMutableDictionary()
        nextCard.setValue(entry.id, forKey: Card.id)
        nextCard.setValue(entry.generation, forKey: Card.generation)
        nextCard.setValue(entry.name, forKey: Card.name)
        nextCard.setValue(entry.height, forKey: Card.height)
        nextCard.setValue(entry.weight, forKey: Card.weight)
        nextCard.setValue(entry.catchRate, forKey: Card.catchRate)
        nextCard.setValue(entry.friendship, forKey: Card.friendship)
        nextCard.setValue(entry.flavor, forKey: Card.flavor)
        pokeCards.append(nextCard)
       }
      callback([pokeCards])
    }
    catch {
      debugPrint(error)
    }
  }
  
}
