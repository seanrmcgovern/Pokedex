//
//  CsvDataManager.swift
//  Pokedex
//
//  Created by Sean McGovern on 12/10/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import CoreData
import UIKit

@available(iOS 10.0, *) // required for CoreDataManager
@objc(CsvDataManager)
class CsvDataManager:NSObject {
  
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
  func saveToJSON() {
    var pokeArray = [AnyObject]()

    let mainContext = CoreDataManager.shared.mainContext
    for i in 1...8 {
      let fetchRequest: NSFetchRequest<PokeCard> = PokeCard.fetchRequest()
      let filter = NSPredicate(format: "generation == %d", i)
      fetchRequest.predicate = filter
      let sort = NSSortDescriptor(key: "id", ascending: true)
      fetchRequest.sortDescriptors = [sort]
      do {
        let results = try mainContext.fetch(fetchRequest)
        for entry in results {
          let dct = NSMutableDictionary()
          dct.setValue(entry.id, forKey: Card.id)
          dct.setValue(entry.generation, forKey: Card.generation)
          dct.setValue(entry.name, forKey: Card.name)
          dct.setValue(entry.height, forKey: Card.height)
          dct.setValue(entry.weight, forKey: Card.weight)
          dct.setValue(entry.catchRate, forKey: Card.catchRate)
          dct.setValue(entry.friendship, forKey: Card.friendship)
          dct.setValue(entry.flavor, forKey: Card.flavor)
          dct.setValue(entry.abilities, forKey: Card.abilities)
          var strBase64:String = ""
          var shinyBase64:String = ""
          if entry.imageData != nil {
            let imageData = NSData(data: entry.imageData!)
            strBase64 = imageData.base64EncodedString(options: NSData.Base64EncodingOptions.lineLength64Characters)
          }
          if entry.shinyData != nil {
            let shinyData = NSData(data: entry.shinyData!)
            shinyBase64 = shinyData.base64EncodedString(options: NSData.Base64EncodingOptions.lineLength64Characters)
          }
          dct.setValue(strBase64, forKey: Card.image)
          dct.setValue(shinyBase64, forKey: Card.shiny)
          dct.setValue(entry.types, forKey: Card.types)
          dct.setValue(entry.stats, forKey: Card.stats)
          pokeArray.append(dct)
        }
      }
      catch {
        debugPrint(error)
      }
    }
    createJSON(from: pokeArray)
  }
  
  func createJSON(from pokeArray:[AnyObject]) {
    do {
      let jsonData = try JSONSerialization.data(withJSONObject: pokeArray, options: .prettyPrinted)
      let fileManager = FileManager.default
      do {
        let path = try fileManager.url(for: .documentDirectory, in: .allDomainsMask, appropriateFor: nil, create: false)
        print("json file path", path)
        let fileURL = path.appendingPathComponent("data.json")
        try jsonData.write(to: fileURL)
      } catch {
        print("error creating file")
      }
    } catch {
      print(error)
    }
  }
  
  @objc
  func saveForms() {
    var pokeArray = [AnyObject]()
    let mainContext = CoreDataManager.shared.mainContext
    
    do {
      if let jsonURL = Bundle.main.url(forResource: "pokedata", withExtension: "json") {
          let jsonData = try Data(contentsOf: jsonURL)
          let parsedData = try JSONSerialization.jsonObject(with: jsonData, options: .mutableContainers)
          let pokeData = parsedData as! [[String:Any]]
          for item in pokeData { // loop through each pokemon
            let fetchRequest: NSFetchRequest<PokeCard> = PokeCard.fetchRequest()
            let filter = NSPredicate(format: "id == %d", item[Card.id] as! Int)
            fetchRequest.predicate = filter
            let results = try mainContext.fetch(fetchRequest)
            
            var forms = [NSMutableDictionary]()
            for entry in results { // loop through each form/variety corresponding to the current pokemon, and add it to the list
              let formDict = NSMutableDictionary()
              formDict.setValue(entry.name, forKey: Card.name)
              formDict.setValue(entry.height, forKey: Card.height)
              formDict.setValue(entry.weight, forKey: Card.weight)
              formDict.setValue(entry.flavor, forKey: Card.flavor)
              // formDict.setValue(entry.abilities, forKey: Card.abilities)
              formDict.setValue(entry.types, forKey: Card.types)
              formDict.setValue(entry.stats, forKey: Card.stats)
              var strBase64:String = ""
              if entry.imageData != nil {
                let imageData = NSData(data: entry.imageData!)
                strBase64 = imageData.base64EncodedString(options: NSData.Base64EncodingOptions.lineLength64Characters)
              }
              formDict.setValue(strBase64, forKey: Card.image)
              forms.append(formDict)
            }
            
            let dct = NSMutableDictionary()
            dct.setValue(item[Card.id], forKey: Card.id)
            dct.setValue(item[Card.generation], forKey: Card.generation)
            dct.setValue(item[Card.name], forKey: Card.name)
            dct.setValue(item[Card.height], forKey: Card.height)
            dct.setValue(item[Card.weight], forKey: Card.weight)
            dct.setValue(item[Card.catchRate], forKey: Card.catchRate)
            dct.setValue(item[Card.friendship], forKey: Card.friendship)
            dct.setValue(item[Card.flavor], forKey: Card.flavor)
            dct.setValue(item[Card.image], forKey: Card.image)
            dct.setValue(item[Card.shiny], forKey: Card.shiny)
            dct.setValue(item[Card.types], forKey: Card.types)
            dct.setValue(item[Card.stats], forKey: Card.stats)
            dct.setValue(item[Card.abilities], forKey: Card.abilities)
            dct.setValue(forms, forKey: Card.forms)
            pokeArray.append(dct)
          }
          createJSON(from: pokeArray)
        }
    } catch {
      print(error)
    }
  }
  
  @objc
  func convertToBase64(_  imageUrl: NSString) {
    var strBase64:String = ""
    if imageUrl != "" {
      if let url = URL(string: imageUrl as String) {
        if let data = try? Data(contentsOf: url) {
          if let img = UIImage(data: data) {
            let png = img.pngData()
            if png != nil {
              let imageData = NSData(data: png!)
              strBase64 = imageData.base64EncodedString(options: NSData.Base64EncodingOptions.lineLength64Characters)
              var pokeArray = [AnyObject]()
              let dct = NSMutableDictionary()
              dct.setValue(strBase64, forKey: Card.image)
              pokeArray.append(dct)
              createJSON(from: pokeArray)
            }
          }
        }
      }
    }
  }
  
//  @objc
//  func saveForms(_ arr:[[NSMutableDictionary]]) {
//    var formLists = arr
//    for list in formLists {
//      for form in list {
//        let imageUrl = form.value(forKey: "image")
//        var strBase64:String = ""
//        if imageUrl as! String != "" && imageUrl != nil {
//          if let url = URL(string: imageUrl as! String) {
//            if let data = try? Data(contentsOf: url) {
//              if let img = UIImage(data: data) {
//                let png = img.pngData()
//                if png != nil {
//                  let imageData = NSData(data: png!)
//                  strBase64 = imageData.base64EncodedString(options: NSData.Base64EncodingOptions.lineLength64Characters)
//                  form.setValue(strBase64, forKey: "image")
//                }
//              }
//            }
//          }
//        }
//      }
//    }
//
//    var pokeArray = [AnyObject]()
//    do {
//      if let jsonURL = Bundle.main.url(forResource: "pokedata", withExtension: "json") {
//          let jsonData = try Data(contentsOf: jsonURL)
//          let parsedData = try JSONSerialization.jsonObject(with: jsonData, options: .mutableContainers)
//          let pokeData = parsedData as! [[String:Any]]
//          var i = 0
//          for item in pokeData {
//            let dct = NSMutableDictionary()
//            dct.setValue(item[Card.id], forKey: Card.id)
//            dct.setValue(item[Card.generation], forKey: Card.generation)
//            dct.setValue(item[Card.name], forKey: Card.name)
//            dct.setValue(item[Card.height], forKey: Card.height)
//            dct.setValue(item[Card.weight], forKey: Card.weight)
//            dct.setValue(item[Card.catchRate], forKey: Card.catchRate)
//            dct.setValue(item[Card.friendship], forKey: Card.friendship)
//            dct.setValue(item[Card.flavor], forKey: Card.flavor)
//            dct.setValue(item[Card.image], forKey: Card.image)
//            dct.setValue(item[Card.shiny], forKey: Card.shiny)
//            dct.setValue(item[Card.types], forKey: Card.types)
//            dct.setValue(item[Card.stats], forKey: Card.stats)
//            dct.setValue(formLists[i], forKey: Card.forms)
//            i += 1
//            pokeArray.append(dct)
//          }
//          createJSON(from: pokeArray)
//        }
//    } catch {
//      print(error)
//    }
//
//  }
  
}

// Logic to combine json with shiny images with json with abilities
//    var pokeArray = [AnyObject]()
//    do {
//      var abilities:[[NSMutableDictionary]] = []
//      if let jsonURL = Bundle.main.url(forResource: "abilityData", withExtension: "json") {
//        let jsonData = try Data(contentsOf: jsonURL)
//        let parsedData = try JSONSerialization.jsonObject(with: jsonData, options: .mutableContainers)
//        let pokeData = parsedData as! [[String:Any]]
//        var count = 0
//        for item in pokeData {
//          let ability = item[Card.abilities] as! [NSMutableDictionary]
//          abilities.append(ability)
//          if ability.isEmpty {
//            print("Missing for pokemon: ", item[Card.name] as! String)
//            count += 1
//          }
//        }
//      }

//      if let jsonURL = Bundle.main.url(forResource: "pokedata", withExtension: "json") {
//        let jsonData = try Data(contentsOf: jsonURL)
//        let parsedData = try JSONSerialization.jsonObject(with: jsonData, options: .mutableContainers)
//        let pokeData = parsedData as! [[String:Any]]
//        var i = 0
//        for item in pokeData {
//          let dct = NSMutableDictionary()
//          dct.setValue(item[Card.id], forKey: Card.id)
//          dct.setValue(item[Card.generation], forKey: Card.generation)
//          dct.setValue(item[Card.name], forKey: Card.name)
//          dct.setValue(item[Card.height], forKey: Card.height)
//          dct.setValue(item[Card.weight], forKey: Card.weight)
//          dct.setValue(item[Card.catchRate], forKey: Card.catchRate)
//          dct.setValue(item[Card.friendship], forKey: Card.friendship)
//          dct.setValue(item[Card.flavor], forKey: Card.flavor)
//          dct.setValue(item[Card.image], forKey: Card.image)
//          dct.setValue(item[Card.shiny], forKey: Card.shiny)
//          dct.setValue(item[Card.types], forKey: Card.types)
//          dct.setValue(item[Card.stats], forKey: Card.stats)
//          dct.setValue(abilities[i], forKey: Card.abilities)
//          i += 1
//          pokeArray.append(dct)
//        }
//        createJSON(from: pokeArray)
//      }
//    } catch {
//      print(error)
//    }
