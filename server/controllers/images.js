import pool from '../database/connect';
import _ from 'lodash';
import NodeCache from 'node-cache';
const mycache = new NodeCache();
let gottenRecentSearchString = [];

const Images = {
  async AllImages(req, res) {
    const offset = req.query.offset;
    const limit = req.query.limit;
    console.log(limit);
    try {
      const ImagesQuery = `SELECT * FROM images  OFFSET $1 LIMIT $2 `;
      const { rows } = await pool.query(ImagesQuery, [offset, limit]);

      return res.status(200).send({
        status: 200,
        message: 'All images successfully retrieved',
        data: rows,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
  async addImage(req, res) {
    const AddQuery = `INSERT INTO images(url,snippet,context,photographer)VALUES($1,$2,$3,$4) returning *`;
    const Values = [
      req.body.url,
      req.body.snippet,
      req.body.context,
      _.capitalize(req.body.photographer),
    ];
    try {
      const { rows } = await pool.query(AddQuery, Values);
      return res.status(201).send({
        status: 201,
        message: 'Image is added successfully',
        data: rows,
      });
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
  async oneImage(req, res) {
    const oneImageQuery = 'SELECT * FROM images WHERE id=$1';
    const value = req.params.id;
    try {
      const { rows } = await pool.query(oneImageQuery, [value]);
      if (rows.length < 1) {
        return res.status(404).send({
          status: 404,
          message: `Image with id ${req.params.id} not found`,
        });
      }
      return res.status(200).send({
        status: 200,
        message: `Image with id ${req.params.id} is retrived successfully`,
        data: rows,
      });
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
  async searchImages(req, res) {
    const text = req.query.text;
    const offset = req.query.offset;
    const limit = req.query.limit;
    const searchQuery =
      'SELECT * FROM images WHERE id || url || snippet || context|| photographer LIKE $1  OFFSET $2 LIMIT $3 ';
    try {
      const { rows } = await pool.query(searchQuery, [
        `%${text}%`,
        offset,
        limit,
      ]);
      let time = new Date();
      let RecentSearchStrings = gottenRecentSearchString;
      RecentSearchStrings.push({ term: text, when: time });
      gottenRecentSearchString = [...RecentSearchStrings];
      return res.status(200).send({
        data: rows,
      });
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
  async recentSearchString(req, res) {
    return res.status(200).send({
      status: 200,
      message: 'All recent search strings successfully retrieved',
      gottenRecentSearchString,
    });
  },
};
export default Images;
