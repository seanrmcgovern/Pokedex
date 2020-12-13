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
    static let types = "types"
    static let stats = "stats"
  }
  
  @objc
  func saveToJSON() {
    print("Saving JSON data")
    
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
          var strBase64:String = ""
          if entry.image != nil {
            let imageData = NSData(data: entry.imageData!)
            strBase64 = imageData.base64EncodedString(options: NSData.Base64EncodingOptions.lineLength64Characters)
          }
          dct.setValue(strBase64, forKey: Card.image)
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
        let fileURL = path.appendingPathComponent("pokedata.json")
        try jsonData.write(to: fileURL)
      } catch {
        print("error creating file")
      }
    } catch {
      print(error)
    }
  }
  
}
