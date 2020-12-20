//
//  PokeCardBridge.swift
//  Pokedex
//
//  Created by Sean McGovern on 9/16/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import CoreData
import UIKit

@available(iOS 10.0, *) // required for CoreDataManager
@objc(PokeCardBridge)
class PokeCardBridge:NSObject {
  
  let defaults = UserDefaults.standard
  
  struct Keys {
    static let username = "username"
    static let userId = "userId"
    static let coreDataSaved = "coreDataSaved"
    static let savedKanto = "savedKanto"
    static let savedJohto = "savedJohto"
    static let savedHoenn = "savedHoenn"
    static let savedSinnoh = "savedSinnoh"
    static let savedUnova = "savedUnova"
    static let savedKalos = "savedKalos"
    static let savedAlola = "savedAlola"
    static let savedGalar = "savedGalar"
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
    static let shiny = "shiny"
    static let types = "types"
    static let stats = "stats"
    static let abilities = "abilities"
    static let forms = "forms"
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
  func isGalarSaved(_ callback: RCTResponseSenderBlock) {
    let curValue = defaults.bool(forKey: Keys.savedGalar)
    callback([curValue])
  }
  
  @objc
  func preloadData() -> Void {
    if (!defaults.bool(forKey: Keys.coreDataSaved)) {
      do {
        if let jsonURL = Bundle.main.url(forResource: "data", withExtension: "json") {
          let jsonData = try Data(contentsOf: jsonURL)
          let parsedData = try JSONSerialization.jsonObject(with: jsonData, options: .mutableContainers)
          let pokeData = parsedData as! [[String:Any]]
          for item in pokeData {
            let id = item[Card.id] as! Int64
            let generation = item[Card.generation] as! Int64
            let name = item[Card.name] as! String
            let height = item[Card.height] as! Int64
            let weight = item[Card.weight] as! Int64
            let catchRate = item[Card.catchRate] as! Int64
            let friendship = item[Card.friendship] as! Int64
            let flavor = item[Card.flavor] as! String
            let image = item[Card.image] as! String
            let shiny = item[Card.shiny] as! String
            let types = item[Card.types] as! [String]
            let stats = item[Card.stats] as! [Int]
            let abilities = item[Card.abilities] as! [NSMutableDictionary]
            let forms = item[Card.forms] as! [NSMutableDictionary]
            
            saveCardToCoreData(id, generation: generation, name: name, height: height, weight: weight, catchRate: catchRate, friendship: friendship, flavor: flavor, image: image, shiny: shiny, types: types, stats: stats, abilities: abilities, forms: forms)
          }
          defaults.set(true, forKey: Keys.coreDataSaved)
        }
      } catch {
        print(error)
      }
    }
  }
  
  func saveCardToCoreData(_ id: Int64, generation: Int64, name: String, height: Int64, weight: Int64, catchRate: Int64, friendship: Int64, flavor: String, image: String, shiny: String, types: [String], stats: [Int], abilities: [NSMutableDictionary], forms: [NSMutableDictionary]) {
    let mainContext = CoreDataManager.shared.mainContext
    let newCard = PokeCard(context: mainContext)
    newCard.id = id
    newCard.generation = generation
    newCard.name = name
    newCard.height = height
    newCard.weight = weight
    newCard.catchRate = catchRate
    newCard.friendship = friendship
    newCard.flavor = flavor
    newCard.image = image
    newCard.shiny = shiny
    newCard.types = types
    newCard.stats = stats
    newCard.abilities = abilities
    newCard.forms = forms
    newCard.isFavorite = false
    CoreDataManager.shared.saveChanges()
  }
  
  @objc
  func savePokeCard(_ id: NSNumber, generation: NSNumber, name: NSString, height: NSNumber, weight: NSNumber, catchRate: NSNumber, friendship: NSNumber, flavor: NSString, imageUrl: NSString, shinyUrl: NSString, types: NSArray, stats: NSArray, abilities: NSArray) {
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
    if imageUrl != "" {
      if let url = URL(string: imageUrl as String) {
        if let data = try? Data(contentsOf: url) {
          if let img = UIImage(data: data) {
            let png = img.pngData()
            newCard.imageData = png
          }
        }
      }
    }
    if shinyUrl != "" {
      if let url = URL(string: shinyUrl as String) {
        if let data = try? Data(contentsOf: url) {
          if let img = UIImage(data: data) {
            let png = img.pngData()
            newCard.shinyData = png
          }
        }
      }
    }
    newCard.types = types as? [String]
    newCard.stats = stats as? [Int]
    newCard.abilities = abilities as? [NSMutableDictionary]
    CoreDataManager.shared.saveChanges()
    switch generation {
    case 0:
      print("Saving forms")
      break
    case 1:
      defaults.set(true, forKey: Keys.savedKanto)
      break
    case 2:
      defaults.set(true, forKey: Keys.savedJohto)
      break
    case 3:
      defaults.set(true, forKey: Keys.savedHoenn)
      break
    case 4:
      defaults.set(true, forKey: Keys.savedSinnoh)
      break
    case 5:
      defaults.set(true, forKey: Keys.savedUnova)
      break
    case 6:
      defaults.set(true, forKey: Keys.savedKalos)
      break
    case 7:
      defaults.set(true, forKey: Keys.savedAlola)
      break
    case 8:
      defaults.set(true, forKey: Keys.savedGalar)
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
        nextCard.setValue(entry.image, forKey: Card.image)
        nextCard.setValue(entry.shiny, forKey: Card.shiny)
        nextCard.setValue(entry.types, forKey: Card.types)
        nextCard.setValue(entry.stats, forKey: Card.stats)
        nextCard.setValue(entry.abilities, forKey: Card.abilities)
        nextCard.setValue(entry.forms, forKey: Card.forms)
        pokeCards.append(nextCard)
      }
      callback([pokeCards])
    }
    catch {
      debugPrint(error)
    }
  }
  
}
